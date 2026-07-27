-- ClickHouse Production DDL Schema for Reddit AdTech Telemetry & Analytics
-- Engine: MergeTree with Partitioning, Indexing & Materialized Percentile Views

CREATE DATABASE IF NOT EXISTS reddit_adtech_analytics;

USE reddit_adtech_analytics;

-- 1. High-Throughput Ad Auction Events Table
CREATE TABLE IF NOT EXISTS ad_auction_events
(
    auction_id String,
    timestamp_ns UInt64,
    event_time DateTime64(3, 'UTC') DEFAULT toDateTime64(timestamp_ns / 1000000000, 3, 'UTC'),
    trace_id String,
    shard_id LowCardinality(String),
    subreddit_id LowCardinality(String),
    advertiser_id String,
    campaign_id String,
    ad_id String,
    bid_cpm Float64,
    predicted_ctr Float64,
    predicted_cvr Float64,
    relevance_score Float64,
    final_ecpm Float64,
    auction_won UInt8,
    total_candidates UInt32
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_time)
PRIMARY KEY (subreddit_id, event_time)
ORDER BY (subreddit_id, event_time, campaign_id, auction_id)
TTL event_time + INTERVAL 30 DAY
SETTINGS index_granularity = 8192;

-- 2. ML Model Latency Events Table
CREATE TABLE IF NOT EXISTS ml_latency_events
(
    trace_id String,
    timestamp_ns UInt64,
    event_time DateTime64(3, 'UTC') DEFAULT toDateTime64(timestamp_ns / 1000000000, 3, 'UTC'),
    model_name LowCardinality(String),
    model_version LowCardinality(String),
    node_pool_id LowCardinality(String),
    compute_unit LowCardinality(String),
    inference_duration_ms Float64,
    preprocessing_ms Float64,
    postprocessing_ms Float64,
    batch_size UInt32,
    gpu_vram_used_gb Float32,
    target_slo_met UInt8
)
ENGINE = MergeTree()
PARTITION BY toYYYYMMDD(event_time)
PRIMARY KEY (model_name, event_time)
ORDER BY (model_name, event_time, node_pool_id, trace_id)
TTL event_time + INTERVAL 14 DAY
SETTINGS index_granularity = 8192;

-- 3. Materialized View for Precomputed Subreddit eCPM Aggregations
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_subreddit_ecpm_hourly
ENGINE = SummingMergeTree()
PRIMARY KEY (subreddit_id, hourly_time)
ORDER BY (subreddit_id, hourly_time)
AS SELECT
    subreddit_id,
    toStartOfHour(event_time) AS hourly_time,
    count() AS total_auctions,
    sum(auction_won) AS total_wins,
    avg(final_ecpm) AS avg_ecpm,
    max(final_ecpm) AS max_ecpm
FROM ad_auction_events
GROUP BY subreddit_id, hourly_time;

-- 4. Materialized View for ML Model P50 / P95 / P99 Latency Percentiles
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_ml_latency_percentiles_5min
ENGINE = AggregatingMergeTree()
PRIMARY KEY (model_name, window_time)
ORDER BY (model_name, window_time)
AS SELECT
    model_name,
    toStartOfFiveMinutes(event_time) AS window_time,
    quantileState(0.50)(inference_duration_ms) AS p50_state,
    quantileState(0.95)(inference_duration_ms) AS p95_state,
    quantileState(0.99)(inference_duration_ms) AS p99_state,
    countIf(target_slo_met = 0) AS slo_violations
FROM ml_latency_events
GROUP BY model_name, window_time;

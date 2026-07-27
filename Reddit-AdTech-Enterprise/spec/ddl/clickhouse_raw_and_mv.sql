-- Raw auction events (hot tier)
CREATE TABLE IF NOT EXISTS ad_auctions_raw
(
  auction_id String,
  timestamp_ns UInt64,
  trace_id String,
  shard_id String,
  winning_ad_id String,
  winning_ecpm Float64,
  creative_hash String,
  policy_flags Array(String),
  bidder_scores Nested (
    bidder_id String,
    score Float64,
    ecpm Float64,
    model_version String
  ),
  metadata Map(String, String)
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(toDateTime(timestamp_ns / 1000000000))
ORDER BY (shard_id, timestamp_ns)
TTL toDateTime(timestamp_ns / 1000000000) + INTERVAL 1 DAY
SETTINGS index_granularity = 8192;

-- Materialized view table for latency percentiles
CREATE TABLE IF NOT EXISTS model_latency_agg
(
  model_id String,
  node_id String,
  bucket_ns UInt64,
  count UInt64,
  window_start DateTime
)
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(window_start)
ORDER BY (model_id, node_id, window_start);

-- Materialized view to populate model_latency_agg
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_model_latency
TO model_latency_agg
AS
SELECT
  model_id,
  node_id,
  (inference_end_ns - inference_start_ns) AS bucket_ns,
  1 AS count,
  toStartOfMinute(toDateTime(timestamp_ns / 1000000000)) AS window_start
FROM model_telemetry_raw;

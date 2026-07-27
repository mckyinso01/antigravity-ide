package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/segmentio/kafka-go"

	pb "github.com/reddit/adstream/v1"
)

func main() {
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers:  []string{"kafka-broker:9092"},
		Topic:    "ad-auctions",
		Balancer: &kafka.Hash{},
	})
	defer w.Close()

	log.Println("Starting synthetic auction load producer (Target: 1,000 events)...")

	for i := 0; i < 1000; i++ {
		now := time.Now().UnixNano()
		ev := &pb.AuctionEvent{
			AuctionId:    fmt.Sprintf("a-%d", i),
			TimestampNs:  now,
			TraceId:      fmt.Sprintf("t-%d", i),
			ShardId:      "shard-1",
			WinningAdId:  "ad-123",
			WinningEcpm:  1.23,
			CreativeHash: "chash-abc",
			BidderScores: []*pb.BidScore{
				{BidderId: "b1", Score: 0.9, Ecpm: 1.23, ModelVersion: "v1"},
			},
		}
		data, err := proto.Marshal(ev)
		if err != nil {
			log.Fatalf("Failed to marshal Protobuf payload: %v", err)
		}
		msg := kafka.Message{
			Key:   []byte(ev.ShardId),
			Value: data,
		}
		err = w.WriteMessages(context.Background(), msg)
		if err != nil {
			log.Fatalf("Failed to write message to Kafka: %v", err)
		}
	}

	log.Println("Successfully pushed 1,000 synthetic auction events to Kafka topic 'ad-auctions'.")
}

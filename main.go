package phantomtype

import (
	"log"

	"cloud.google.com/go/storage"
	"net/http"
	"google.golang.org/api/iterator"

	"google.golang.org/appengine"
	"fmt"
)

func init() {
	http.HandleFunc("/hello", handler)
}

func handler(w http.ResponseWriter, r *http.Request)  {
	ctx := appengine.NewContext(r)

	bucketName := "phantomtype-180814.appspot.com"

	fmt.Fprint(w, "uho")

	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %V", err)
	}

	bucket := client.Bucket(bucketName)
	fmt.Fprint(w, bucket.Object("photos"))

	objects := bucket.Objects(ctx, nil)
	var list string = ""
	for {
		o, err := objects.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return
		}
		list = list + o.Name
	}

	fmt.Fprint(w, list)
}

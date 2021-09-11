import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
  // Public reference to the table
  bucket;
  table;
// Create an S3 bucket

  constructor(scope, id, props) {
    super(scope, id, props);

      this.bucket = new sst.Bucket(this, "Uploads", {
          s3Bucket: {
              cors: [
                  {
                      maxAge: 3000,
                      allowedOrigins: ["*"],
                      allowedHeaders: ["*"],
                      allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"]
                  },
              ],
          },
      });
    // Create the DynamoDB table
    this.table = new sst.Table(this, "Notes", {
      fields: {
        userId: sst.TableFieldType.STRING,
        noteId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    });
  }
}

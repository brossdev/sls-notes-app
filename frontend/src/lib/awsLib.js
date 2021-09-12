import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    // replace with uuid once this is working
    const filename = `${Date.now()}-${file.name}`;

    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type,
    });

    return stored.key;
}

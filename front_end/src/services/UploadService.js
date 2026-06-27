

export const uploadFileToS3 = async (uploadUrl, file) => {
    const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
        },
        body: file,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }
};
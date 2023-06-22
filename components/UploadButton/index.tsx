import React, {useState} from 'react';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [imageSrc, setImageSrc] = useState(null);

  // Handle the upload
  const handleUpload = event => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle the submit
  const handleSubmit = async event => {
    event.preventDefault();

    // Create a FormData object
    let formData = new FormData();

    // Add the file to the FormData object
    formData.append('file', selectedFile);

    // Send the FormData object to the server, where the server is localhost:5000

    const response = await fetch('http://127.0.0.1:5000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Uploaded successfully!');
      // Convert response to blob and create an object URL
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      // Set the image source state
      setImageSrc(imgUrl);
    } else {
      console.error('Upload failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleUpload} />
        <button type="submit">Upload</button>
      </form>
      {/* Show image after successful upload */}
      <br />
    {imageSrc && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <img
                src={imageSrc}
                alt="Uploaded file"
                style={{
                  width: '50%', // or any other size you want
                  height: 'auto', // maintain aspect ratio
                  maxWidth: '2000px', // max width
                  maxHeight: '2000px', // max height
                }}
              />
              <a href={imageSrc} download="output.png" style={{ marginTop: '20px' }}>
                <button>Save as file</button>
              </a>
            </div>
          )}
    </div>
  );
};
export default Upload;

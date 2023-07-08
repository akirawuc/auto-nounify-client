import React, {useState} from 'react';

// upload file to gcs

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  const [nounify, setNounify] = useState(false);

  const handleUpload = event => {
    setSelectedFile(event.target.files[0]);
    
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (e) => {
      setImageSrc(e.target.result);
    };
  };

  const handleSubmit = async event => {
    event.preventDefault();


    let formData = new FormData();
    formData.append('file', selectedFile);

    
    const response = await fetch('https://us-central1-fleet-surface-347907.cloudfunctions.net/add_noggles', {
      method: 'POST',
      body: formData,
        header: new Headers({
            'Content-Type': 'multipart/form-data'
        }),
    });

    if (response.ok) {
      console.log('Uploaded successfully!');
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      setImageSrc(imgUrl);
        setNounify(true);
    } else {
      console.error('Upload failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="border border-gray-300 p-2 rounded">
          <input type="file" onChange={handleUpload} />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Nounify!</button>
      </form>

      {imageSrc && (
        <div className="mt-6 flex flex-col items-center">
          <img
            src={imageSrc}
            alt="Uploaded file"
            className="w-full max-w-lg max-h-lg object-contain"
          />
          { nounify && (
          <a href={imageSrc} download="output.png" className="mt-4">
            <button className="bg-blue-500 text-white p-2 rounded">Save as file</button>
          </a>
      )}
        </div>
      )}
    </div>
  );
};

export default Upload;

import React, {useState} from 'react';
import {  useAccount } from 'wagmi';

// upload file to gcs

type UploadProps ={
    className?: string;
}
const Upload: React.FC<UploadProps> = ({className}) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [nounify, setNounify] = useState(false);
  const { address, connector, isConnected } = useAccount();

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
    setSelectedFile(event.target.files[0]);
    
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (e) => {
        if (e.target){
      setImageSrc(e.target.result as string);
        }
    };
        }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      if (selectedFile){

    let formData = new FormData();
    formData.append('file', selectedFile);

    
  const response = await fetch('https://us-central1-fleet-surface-347907.cloudfunctions.net/add_noggles', {
      method: 'POST',
        headers: {
            'X-Wallet-Address': address,
        },
      body: formData,
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
      }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="border border-gray-300 p-2 rounded">
          <input type="file" onChange={handleUpload} />
        </div>
        { isConnected && (
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Nounify!</button> )}
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

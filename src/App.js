import logo from './logo.svg';
import './App.css';
import { TopSection } from './components/LandingPage/TopSection';
import ImageCrop from './components/ImageCrop/ImageCrop';
import { useState } from 'react';

function App() {
  const [url,setUrl]=useState('')
  
  return (
    <div className="App">
      <h2 className="title"> React Image Crop / Editor</h2>
     <TopSection setUrl={setUrl}/>
     {url && <ImageCrop url={url}/>}
    </div>
  );
}

export default App;

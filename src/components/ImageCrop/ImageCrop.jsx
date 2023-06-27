import './ImageCrop.css';
import { useState,useRef ,useEffect} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { BsFillCloudDownloadFill } from 'react-icons/bs';
import { AiOutlineRotateRight } from 'react-icons/ai';


import { canvasPreview } from '../../cropImage';

export default function ImageCrop({url}) {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [completedCrop, setCompletedCrop] = useState();
  const imageUrl=url;


  const onZoom = (e) => {
    setScale(parseFloat(e));
  };

  const rotateRight = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  const download = async () => {
    await canvasPreview(imgRef.current, completedCrop, scale, rotation);
  };
  const onImageLoad = (e) => {
    setHeight(e?.currentTarget?.height);
    setWidth(e?.currentTarget?.width);
    setCompletedCrop({
      x: 0,
      y: 0,
      height: e?.currentTarget?.height,
      width: e?.currentTarget?.width,
      unit: 'px'
    });
  };
  return (
    <div
    className={'outerDiv'}
    onWheel={(e) => {
      if (e.deltaY > 0) {
        setScale(scale + 0.1);
      } else if (e.deltaY < 0 && scale > 0.1) {
        setScale(scale - 0.1);
      }
    }}
  >
    <ReactCrop
      src={ imageUrl}
      crop={crop}
      onChange={(_, percentCrop) => {
        setCrop(percentCrop);
      }}
      onComplete={(e) => {
        if (e?.height == 0 || e?.width == 0) {
          setCompletedCrop({
            x: 0,
            y: 0,
            height: height,
            width: width,
            unit: 'px'
          });
        } else {
          setCompletedCrop(e);
        }
      }}
    >
      <img
        ref={imgRef}
        crossorigin='anonymous'
        alt='Error'
        src={ imageUrl}
        style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
        onLoad={onImageLoad}
      />
    </ReactCrop>
    <div className={'controls'}>
        <input
          type='range'
          min={0.1}
          max={3}
          step={0.05}
          value={scale}
          onInput={(e) => {
            onZoom(e.target.value);
          }}
          className={'slider'}
        ></input>
        <span className={'rangeText'}>Zoom In/Out</span>
    </div>
    <div className={'controlsIcon'}>
          <BsFillCloudDownloadFill className={'icon'} onClick={download} />
          <AiOutlineRotateRight className={'icon'} onClick={rotateRight} />
        
    </div>
  </div>
  );
}


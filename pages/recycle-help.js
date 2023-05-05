import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useState} from 'react';


export default function RecycleHelp() {

    const [image, setImage] = useState('')
    const [plasticNumber, setPlasticNumber] = useState('1')

    function readFile() {
        const reader = new FileReader();
        reader.onload = 
        reader.addEventListener('load', () => loaded(reader))
        reader.readAsDataURL(photo.files[0]);
    }

    async function loaded(reader) {
        const response = await fetch('https://jordanmueller-plastics.hf.space/run/predict', {
            method: "POST", body: JSON.stringify({ "data": [reader.result] }),
            headers: { "Content-Type": "application/json" }
        });
        const json = await response.json();
        const label = json['data'][0]['confidences'][0]['label'];
        setImage(reader.result);
        setPlasticNumber(label);
    }

    function Results({image, plasticNumber}) {
        return (
            <div className={utilStyles.results}>
                <img src={image} width="200"></img>
                <img src={"/blog/images/resin_code_" + plasticNumber + ".png"} width="200"></img>
            </div>
        );
    }

    return (
      <Layout recycleHelp>
        <header>
            <h1>What Plastic Number?</h1>
        </header>
        <label htmlFor={'photo'}>
            <div className={utilStyles.chooseFile}>
                <AddAPhotoIcon color="primary" className={utilStyles.photoIcon}/> Select Plastic Image
            </div>
        </label>
        <input id="photo" type="file" onInput={readFile} style={{display: 'none'}} />
        { image.length > 0 && <Results image={image} plasticNumber={plasticNumber} />}
      </Layout>
    );
  }
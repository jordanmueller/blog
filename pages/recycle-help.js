import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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
    results.innerHTML = `<br/><p>Your Plastic</p><img src="${reader.result}" width="200"><br/><p>Is this number:</p><img src="/blog/images/resin_code_${label}.png" width="200">`
}

export default function RecycleHelp() {
    return (
      <Layout recycleHelp>
        <header>
            <h1>What Plastic Number?</h1>
        </header>
        <label htmlFor={'photo'}>
            <div className={utilStyles.chooseFile}>
                <AddAPhotoIcon color="secondary" className={utilStyles.photoIcon}/> Select Plastic Image
            </div>
        </label>
        <input id="photo" type="file" onInput={readFile} style={{display: 'none'}} />
        <div id="results"></div>
      </Layout>
    );
  }
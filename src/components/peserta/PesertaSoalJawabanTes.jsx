import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// Komponen untuk menampilkan soal
export default function PesertaSoalJawabanTes(props) {
    
    return (
        <div className="border-2 mt-4 rounded-lg border-white p-4 bg-gray-700" id={`row${props.index}`} key={props.index}>
            <div>{props.soal[0]}, {props.soal[1]}, {props.soal[2]}, {props.soal[3]}</div>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={props.jawabanUser}
                onChange={(event) => props.handleChange_nilaiTotal(event, index)}
            >
                <FormControlLabel value={props.pertanyaan.nilai_A} control={<Radio />} label="A" />
                <FormControlLabel value={props.pertanyaan.nilai_B} control={<Radio />} label="B" />
                <FormControlLabel value={props.pertanyaan.nilai_C} control={<Radio />} label="C" />
                <FormControlLabel value={props.pertanyaan.nilai_D} control={<Radio />} label="D" />
                <FormControlLabel value={props.pertanyaan.nilai_E} control={<Radio />} label="E" />
            </RadioGroup>
        </div>
    );
}
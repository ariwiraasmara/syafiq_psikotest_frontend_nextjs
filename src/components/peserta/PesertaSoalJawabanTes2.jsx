export default function renderRow(props) {
    const data = props.dataSoal[props.index];
    return (
        <div style={props.style} key={props.index}>
            <div>{data[0]}, {data[1]}, {data[2]}, {data[3]}</div>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={props.jawabanUser}
                onChange={(event) => props.handleChange_nilaiTotal}
            >
                <FormControlLabel value={props.dataPertanyaan.nilai_A} control={<Radio />} label="A" />
                <FormControlLabel value={props.dataPertanyaan.nilai_B} control={<Radio />} label="B" />
                <FormControlLabel value={props.dataPertanyaan.nilai_C} control={<Radio />} label="C" />
                <FormControlLabel value={props.dataPertanyaan.nilai_D} control={<Radio />} label="D" />
                <FormControlLabel value={props.dataPertanyaan.nilai_E} control={<Radio />} label="E" />
            </RadioGroup>
        </div>
    );
};
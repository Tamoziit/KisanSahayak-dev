/* eslint-disable react/prop-types */
import FrequencyChart from './FrequencyChart';

const DiseaseChart = ({ diseaseFrequency }) => {
    const labels = Object.keys(diseaseFrequency);
    const data = Object.values(diseaseFrequency);

    return (
        <div>
            <FrequencyChart labels={labels} data={data} title="Disease Frequency" head="Most Predicted Diseases" />
        </div>
    );
};

export default DiseaseChart;

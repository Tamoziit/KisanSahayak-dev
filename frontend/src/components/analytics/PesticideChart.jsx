/* eslint-disable react/prop-types */
import FrequencyChart from "./FrequencyChart";

const PesticideChart = ({ pesticideFrequency }) => {
    const labels = Object.keys(pesticideFrequency);
    const data = Object.values(pesticideFrequency);

    return (
        <div>
            <FrequencyChart labels={labels} data={data} title="Pesticide Frequency" head="Most suggested Pesticides for You" />
        </div>
    );
};

export default PesticideChart;

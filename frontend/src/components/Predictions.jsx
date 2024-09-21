/* eslint-disable react/prop-types */
const Predictions = ({ data }) => {
  return (
    <>
      <div className="flex flex-col gap-2 bg-slate-300 text-gray-800 rounded-lg w-1/2 p-3 shadow-xl">
        <div>
          <p className="font-bold text-lg">Disease: {data.disease}</p>
          <p className="font-normal px-2">{data.disease_details.map((el, idx) => (
            <span key={idx}>{el}&nbsp;</span>
          ))}</p>
        </div>
        <div>
          <p className="font-semibold text-lg">Crop: {data.crop}</p>
        </div>
        <div>
          <p className="font-medium">Recommendation:</p>
          <ul className="pl-2 list-disc list-inside">
            {data.recomm.map((el, _idx) => (
              <li key={_idx}>{el}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium">Pesticides:</p>
          <ul className="pl-2 list-disc list-inside">
            {data.pesticides.map((el, _idx) => (
              <li key={_idx}>{el}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Predictions;
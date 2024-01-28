/* eslint-disable react/prop-types */
export default function Warning({ fieldName }) {
  return (
    <p className="w-4/5 p-5 text-xl mt-4 text-black font-semibold bg-red-300 m-auto rounded text-center">
      Please fill the{" "}
      <span className="text-red-600 font-bold">{fieldName} field</span> first!{" "}
    </p>
  );
}

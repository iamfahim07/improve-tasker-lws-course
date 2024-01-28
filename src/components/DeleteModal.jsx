/* eslint-disable react/prop-types */
export default function DeleteModal({
  title,
  handleDeleteAndDeleteAll,
  handleDeleteModalClose,
}) {
  return (
    <>
      <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
      <div className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-10">
        <p className="text-2xl">
          Are you sure? You want to delete{" "}
          <span className="text-red-600 font-bold">{title}</span> Task?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={handleDeleteModalClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={handleDeleteAndDeleteAll}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

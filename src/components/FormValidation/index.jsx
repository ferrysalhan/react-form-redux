import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFormData } from "../../redux/actions/storeAction";

const inputArr = [
  {
    type: "text",
    id: 1,
    value: ""
  }
];


const Index = () => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({

  });

  const dispatch = useDispatch();

  const [uploadFile, setUploadFile] = useState([{ filename: "", filetype: "", file: "" }]);

  const [getFileType, setGetFileType] = useState("");
  const fileTypeList = ["jpeg", "jpg", "png", "gif", "svg"];
  const [checkValue, setCheckValue] = useState(false);
  const [error, setError] = useState("");
  const [showFileType, setShowFileType] = useState("");
  const [arrData, setArrayData] = useState([]);


  const [numInputs, setNumInputs] = useState(1);

  const handleAddInput = () => {
    setNumInputs(numInputs + 1);
    const inputs = watch("inputs");
    //set("inputs", [...inputs, { value: "" }]);
  };

  const onSubmitData = (data) => {
    console.log({ data });
  };


  //   const allFilesData = (event, ind) => {
  //     console.log({ event: event.target.files })
  //     let allPreviousFiles = uploadFile;

  //     let typeFile = event?.target?.files[0]?.type?.split("/")[1];
  //     if (showFileType.includes(typeFile)) {
  //         setError("");
  //     }
  //     else {
  //         setError("Invalid File Type");
  //     }
  //     console.log({ allPreviousFiles });
  //     setGetFileType(typeFile);
  // };

  // const addressValidate = (val) => {
  //   console.log({val});
  // }


  const validateDate = (value) => {
    const selected = new Date(value).getFullYear();
    const now = new Date().getFullYear();
    return now - selected >= 18;
  };

  const validFileFormat = (value) => {

    let typeFile = value[0]?.type?.split("/")[1];
    console.log({ typeFile });

    setGetFileType(typeFile);
    console.log("condition", showFileType.includes(typeFile));
    return showFileType.includes(typeFile);

  }

  const handleDeleteRow = (ind) => {
    const filterData = uploadFile?.filter((item, i) => {
      return i !== ind;
    });

    setUploadFile(filterData);
  }

  // const handleFileName = (event, ind) => {
  //    console.log({ind});
  //   let allFiles = uploadFile;
  //   console.log({allFiles});
  //   console.log("first", allFiles[ind], event.target.name);
  //   console.log("values", allFiles[ind][event.target.name]);

  //   allFiles[ind][event.target.name] = event.target.value;
  //   setUploadFile(allFiles);

  // };



  //   const handleSelectType = (event, ind) => {
  //     const { value, name } = event.target;
  //     let allFileTypes = [...uploadFile];
  //     allFileTypes[ind][name] = value;
  //     setUploadFile(allFileTypes);
  //     setShowFileType(value);

  // }

  const handleSelectType = (event, ind) => {
    setUploadFile((prev) => {
      const newArr = prev.slice();
      newArr[ind].filetype = event.target.value;
      return newArr;
    })

  }

  const setDocument = (e, index) => {
    console.log("target", e.target.value);

    setUploadFile((prev) => {
      const newArr = prev.slice();
      console.log({ newArr });
      newArr[index].filename = e.target.value;
      return newArr;
    })
  }

  const setDocumentFile = (e, index) => {
    setUploadFile((prev) => {
      const newArr = prev.slice();
      newArr[index].file = e.target.files[0];
      return newArr;
    })
  };




  // const setDocument = (e, index) => {
  //   console.log("im here");
  //   let oldDocs = [...uploadFile];
  //   oldDocs[index][e.target.name] = e.target.value;
  //   setUploadFile(oldDocs);
  //   console.log({ oldDocs });
  // };

  // const setDocumentFile = (e, index) => {
  //   console.log("im here");
  //   let oldDocs = [...uploadFile];
  //   oldDocs[index][e.target.name] = e.target.files[0];
  //   setUploadFile(oldDocs);
  //   console.log({ oldDocs });
  // };


  const handleCheckBox = (event) => {
    console.log("check", event.target.checked);
    setCheckValue(event.target.checked);
  }

  // const handleFileUpload = (event, ind) => {

  //   let uploadFilesList = uploadFile;
  //   console.log({uploadFilesList})
  //   console.log("value", uploadFilesList[ind][event.target.name]);
  //   console.log("file", event.target.files[0]);
  //   uploadFilesList[ind][event.target.name] = event.target.files[0].name;
  //   setUploadFile(uploadFilesList);


  // };

  //console.log({uploadFile});


  const onSubmit = (data) => {
    //data.file = data?.file[0].name;
    data["allFiles"] = uploadFile;

    if (checkValue === true) {
      data.permanentAddress1 = data.residenceAddress1;
      data.permanentAddress2 = data.residenceAddress2;
    }

    console.log({ data });
    dispatch(setFormData(data));
    reset();
  };


  return (
    <div>



      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div>
          <label
            htmlFor='firstName'
            className='block text-gray-700 font-bold mb-2'
          >
            Persnal Details -
          </label>
          <div className='grid grid-cols-2 gap-4 ml-24'>
            <div className='mb-2'>
              <label
                htmlFor='firstName'
                className='block text-gray-700 font-bold mb-2'
              >
                First Name
              </label>
              <input
                className='shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register("firstName", { required: true })}
                placeholder='Please Enter the First Name'
              />
              <div>
                {errors.firstName && (
                  <span className='text-red-500	font-bold'> Required.</span>
                )}
              </div>
            </div>

            <div className='mb-4'>
              <label
                className='block text-gray-700 font-bold mb-2'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <input
                className='shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register("lastName", { required: true })}
                placeholder='Please Enter the Last Name'
              />
              <div>
                {errors.lastName && (
                  <span className='text-red-500	font-bold'> Required.</span>
                )}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 ml-24'>
            <div className='mb-4'>
              <label
                className='block text-gray-700 font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                placeholder='Please Enter your email'
              />
              <div>
                {errors.email && errors.email.type === "required" && (
                  <span className='text-red-500	font-bold'> Required.</span>
                )}
              </div>
              <div>
                {errors.email && errors.email.type === "pattern" && (
                  <span className='text-red-500	font-bold'>
                    Please Enter a valid email address.
                  </span>
                )}
              </div>
            </div>

            <div className='mb-4'>
              <label
                className='block text-gray-700 font-bold mb-2'
                htmlFor='email'
              >
                Age
              </label>
              <input
                className='shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register("date", {
                  validate: validateDate,
                  required: true,
                })}
                type='date'
                name='date'
                id='date'
                placeholder='Please Select the Date'
              />
              <div>
                {errors.date && errors.date.type === "required" && (
                  <span className='text-red-500	font-bold'> Required.</span>
                )}
              </div>

              <div>
                {errors.date && errors.date.type === "validate" && (
                  <span className='text-red-500	font-bold'>
                    You must be at least 18 years
                  </span>
                )}
              </div>
            </div>
          </div>

          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='Address'
          >
            Residential Address -
          </label>
          <div className='grid grid-cols-2 gap-4 ml-24'>
            <div className='mb-4'>
              <label
                htmlFor='firstName'
                className='block text-gray-700 font-extralight mb-2'
              >
                Street1 *
              </label>

              <input
                className='shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register("residenceAddress1", { required: true })}
                placeholder='Please Enter Address'
              />
              <div>
                {errors.residenceAddress1 && (
                  <span className='text-red-500	font-bold'> Required.</span>
                )}
              </div>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='residenceAddress1'
                className='block text-gray-700 font-extralight mb-2'
              >
                Street2 *
              </label>
              <input
                className='shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register("residenceAddress2", { required: true })}
                placeholder='Please Enter Address'
              />

              <div>
                {errors.residenceAddress2 && (
                  <span className='text-red-500	font-bold'> Required.</span>
                )}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='Checkbox'
            >
              Same as Residential Address -
              <input className='ml-10 mt-5' type='checkbox' name='toggle' {
                ...register("toggle", {
                  onChange: (event) => {
                    handleCheckBox(event)
                  }

                })

              } />
            </label>
          </div>

          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='Address'
          >
            Permanent Address
          </label>
          <div className='grid grid-cols-2 gap-4 ml-24'>
            <div className='mb-4'>
              <label
                htmlFor='firstName'
                className='block text-gray-700 font-extralight mb-2'
              >
                Street1 *
              </label>

              <input
                className='shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register(checkValue ? "residenceAddress1" : "permanentAddress1",

                )}
                disabled={checkValue}
                placeholder='Please Enter Address'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='firstName'
                className='block text-gray-700 font-extralight mb-2'
              >
                Street2 *
              </label>
              <input
                className='shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register(checkValue ? "residenceAddress2" : "permanentAddress2")}
                disabled={checkValue}
                placeholder='Please Enter Address'
              />
            </div>
          </div>


          <label
            htmlFor='firstName'
            className='block text-gray-700 font-bold mb-2'
          >
            Upload Files -
          </label>

          {
            uploadFile.length > 0
              ?
              uploadFile?.map((item, ind) => {

                return (
                  <div key={ind} className='grid grid-cols-4 gap-4 text-center ml-20'>
                    <div>

                      <div className='mb-4'>
                        <Controller
                          //name={`${uploadFile}[${ind}].filename`}
                          name="filename"
                          control={control}
                          // rules={{ required: true }}
                          render={({
                            field, fieldState
                          }) => (
                            <>
                              <label
                                htmlFor='firstName'
                                className='block text-gray-700 font-extralight mb-2'
                              >
                                File Name
                              </label>

                              <input
                                {...field}
                                name="filename"
                                //value={item.filename || ""}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id="fileName"
                                onChange={(event) => field.onChange(setDocument(event, ind))}
                              />

                              <div>
                                {errors.filename && (
                                  <span className='text-red-500	font-bold'> Required.</span>
                                )}
                              </div>
                            </>



                          )}
                        />
                      </div>

                      <div className='mb-4'>
                        <Controller
                          //name={`${uploadFile}[${ind}].filename`}
                          name="filetype"
                          control={control}
                          //rules={{ required: true }}
                          render={({
                            field, fieldState
                          }) => (
                            <>
                              <label
                                htmlFor='filetype'
                                className='block text-gray-700 font-extralight mb-2'
                              >
                                file Type
                              </label>

                              <select
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='filetype'
                                defaultValue=''
                                name={`filetype`}
                                onChange={(event) => {
                                  handleSelectType(event, ind);
                                }}

                              >
                                <option value=''>Select Option</option>
                                <option value={[fileTypeList]}>Image</option>
                                <option value='pdf'>PDF</option>
                              </select>

                              <div>
                                {errors.filetype && (
                                  <span className='text-red-500	font-bold'> Required.</span>
                                )}
                              </div>
                            </>

                          )}
                        />
                      </div>


                      <div className='mb-4'>
                        <Controller
                          //name={`${uploadFile}[${ind}].filename`}
                          name="file"
                          control={control}
                          // rules={{ required: true }}
                          render={({
                            field, fieldState
                          }) => (
                            <>
                              <label
                                htmlFor='file'
                                className='block text-gray-700 font-extralight mb-2'
                              >
                                Upload File
                              </label>

                              <input
                                {...field}
                                name="file"
                                type={`file`}
                                //value={item.filename || ""}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id="file"
                                onChange={(event) => field.onChange(setDocumentFile(event, ind))}
                              />

                              <div>
                                {errors.file && (
                                  <span className='text-red-500	font-bold'> Required.</span>
                                )}
                              </div>
                            </>



                          )}
                        />
                      </div>

                      {/* <div className='mb-4'>
                        <label
                          htmlFor='firstName'
                          className='block text-gray-700 font-extralight mb-2'
                        >
                          File Name
                        </label>

                        <input
                          type='text'
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          name={`${uploadFile}[${ind}].filename`}
                          id='fileName'
                          onChange={(event) => {
                            setDocument(event, ind)
                          }}
                          // ref={register("filename", {
                          //   required: true
                          // })}
                          //value={item.filename || ""}
                          {...register(ind == 0 ? `filename0` : `filename1`, {
                            required: true,
                            onChange: (event) => {
                              setDocument(event, ind)
                            }
                          })}
                          placeholder='Please enter the File Name'
                        />

                        <div>
                          {errors.filename && (
                            <span className='text-red-500	font-bold'> Required.</span>
                          )}
                        </div>
                      </div> */}

                    </div>

                    {/* <div>
                      <label
                        htmlFor='firstName'
                        className='block text-gray-700 font-extralight mb-2'
                      >
                        Select File Type
                      </label>

                      <select
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='filetype'
                        defaultValue=''
                        name={`${uploadFile}[${ind}].filetype`}
                        onChange={(event) => {
                          handleSelectType(event, ind);
                        }}
                        // ref={register("filetype", {
                        //   required: true
                        // })}
                        // name='filetype'
                        //value={item.filetype || ""}
                        {...register(ind == 0 ? `filetype0` : `filetype1`, {
                          required: true,
                          onChange: (event) => {
                            handleSelectType(event, ind);
                          }
                        })}
                      >
                        <option value=''>Select Option</option>
                        <option value={[fileTypeList]}>Image</option>
                        <option value='pdf'>PDF</option>
                      </select>
                      <div>
                        {errors.filetype && (
                          <span className='text-red-500	font-bold'> Required.</span>
                        )}
                      </div>
                    </div> */}

                    {/* <div>
                      <label
                        htmlFor='firstName'
                        className='block text-gray-700 font-extralight mb-2 '
                      >
                        Choose File
                      </label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10'
                        type='file'
                        //name="file"
                        name={`${uploadFile}[${ind}].file`}
                        //value={item.file[0].name}
                        onChange={(event) => {

                          setDocumentFile(event, ind)

                        }}
                        accept={uploadFile[ind].filetype}
                        placeholder='Please Choose Your File'
                        // ref={register("file", {
                        //   validate: validFileFormat,
                        //   required: true,
                        // })}
                        {...register(ind == 0 ? `file0` : `file1`, {

                          validate: validFileFormat,
                          required: true,
                          onChange: (event) => {
                            setDocumentFile(event, ind)
                          }
                        })}
                      />
                      <div>
                        {errors.file && errors.file.type === "required" && (
                          <span className='text-red-500	font-bold'>Required.</span>
                        )}


                      </div>

                      <div>
                        {errors.file && errors.file.type === "validate" && (
                          <span className='text-red-500	font-bold'>
                            Invalid File Format.
                          </span>
                        )}
                      </div>
                    </div> */}

                    <div className='mt-8'>
                      {
                        ind == 0
                          ?
                          <button
                            className='bg-black hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                            onClick={() => {
                              if (uploadFile.length < 2) {
                                setUploadFile((prev) => {
                                  return [
                                    ...prev,
                                    {
                                      file: "",
                                      filename: "",
                                      filetype: "",
                                    }
                                  ]
                                })
                                // setUploadFile(
                                //   [...uploadFile, {
                                //         filename: "",
                                //         filetype: "",
                                //         file: "",
                                //       },
                                //     ])
                              }


                            }}
                          >
                            +
                          </button>
                          :

                          <button
                            className='bg-black hover:bg-yellow-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                            onClick={() => handleDeleteRow(ind)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                          </button>



                      }




                    </div>
                  </div>

                )
              })
              : null
          }



        </div>

        <div className='text-center	'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-green-700 text-white mt-5 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Index;

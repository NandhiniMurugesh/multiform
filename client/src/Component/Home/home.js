import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Input, Button, Progress, FormControl } from '@chakra-ui/react';

export function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: ''
  });
  const facts = [
    "Cats have individual preferences for scratching surfaces and angles. Some are horizontal scratchers while others exercise their claws vertically.",
    "Cats sleep for 70% of their lives.",
    "A group of cats is called a clowder.",
    "The world’s largest cat measured 48.5 inches long."
  ];
  function getRandomFact() {
    return facts[Math.floor(Math.random() * facts.length)];
  }
  const fact = getRandomFact();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
      if (!validImageTypes.includes(fileType)) {
        alert("Please upload an image file (SVG, PNG, JPG or GIF).");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleUpload() {
    if (!selectedFile) {
      alert("Upload the file");
    } else {
      alert("Image Uploaded successfully!");
      setStep(1);
    }
  }

  function handleForm() {
    if (formData.fname === "") {
      alert("Enter the First Name");
    } else if (formData.lname === "") {
      alert("Enter the Last Name");
    } else if (formData.email === "") {
      alert("Enter the Email");
    } else {
      alert("Registration Successful!");
      setStep(2);
    }
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  }

  return (
    <>
      <div className="container bg-body-tertiary">
        <Tabs index={step} onChange={(index) => setStep(index)}>
          <TabList>
            <Tab>Step 1</Tab>
            <Tab>Step 2</Tab>
            <Tab>Success</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Progress value={20} size='sm' colorScheme='pink' width={300} />
              <div className="flex w-full items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
                </Label>
              </div>

              <div className="mt-2 text-center">
                <Button colorScheme='pink' onClick={handleUpload}>Upload</Button>
              </div>
              <div className="preview-container">
                {preview && (
                  <div className="mt-4 border border-5 text-center border-black">
                    <h5>Image Preview</h5>
                    <img src={preview} alt="Selected" className="max-w-full h-auto" />
                  </div>
                )}
              </div>
            </TabPanel>

            <TabPanel>
              <Progress value={50} size='sm' colorScheme='pink' width={300} />
              <div className="container p-3">
                <div className="d-flex mt-2 ">
                  <FormControl isRequired className="w-50">
                    <Input placeholder='First name' id="fname" value={formData.fname} onChange={handleChange} />
                  </FormControl>
                  <FormControl isRequired className="w-50 ms-5">
                    <Input placeholder='Last name' id="lname" value={formData.lname} onChange={handleChange} />
                  </FormControl>
                </div>
                <div>
                  <FormControl isRequired className="mt-3">
                    <Input placeholder='Email' id="email" value={formData.email} onChange={handleChange} />
                  </FormControl>
                  <div className="mt-2">
                    <Button colorScheme='pink' onClick={handleForm}>Next</Button>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <Progress value={100} size='sm' colorScheme='pink' width={300} />
              <h3>Congratulations! Your Info is Registered</h3>
              <p>First Name: {formData.fname}</p><br />
              <p>Last Name: {formData.lname}</p><br />
              <p>Email: {formData.email}</p><br /><br />
              <p>Here is a fact for you:</p><br />
              <p><mark>{fact}</mark></p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}



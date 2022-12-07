import { useState } from "react";
import "./App.css";
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from "./Character"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { FaRegCopy } from 'react-icons/fa';

function App() {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(10)
  const [isUppercase, setIsUppercase] = useState(false)
  const [isLowercase, setIsLowercase] = useState(false)
  const [isIncludeNumbers, setIsIncludeNumbers] = useState(false)
  const [isIncludeSymbols, setIsIncludeSymbols] = useState(false)

  const handleGeneratePassword = () => {
    if (!isIncludeNumbers && !isIncludeSymbols && !isUppercase && !isLowercase) {
      notify("To generate password you must select at least one condition.", true)
    } else {
      let characterList = ""
      if (isIncludeNumbers) {
        characterList = characterList + numbers
      }
      if (isIncludeSymbols) {
        characterList = characterList + specialCharacters
      }
      if (isUppercase) {
        characterList = characterList + upperCaseLetters
      }
      if (isLowercase) {
        characterList = characterList + lowerCaseLetters
      }
      setPassword(createPassword(characterList))
      notify("Your password is generated succesfully.")
    }
  }

  const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let index = 0; index < passwordLength; index++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    // console.log(password);
    return password
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error('🦄 Wow so easy!', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const handleCopyPassword = (e) => {
    if (password === "") {
      notify("Password unsuccessfully copied to clipboard.", true)
    } else {
      copyToClipboard(password)
      notify("Password successfully copied to clipboard.")
    }
  }

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="App">
      <div className="generatorCard">
        <h2 className="generatorHeader">Password Generator</h2>
        <hr />
        <div className="generatorPassword">
          {/* <h2>{password}</h2> */}
          <button className="copyPassword" onClick={handleCopyPassword}>
            {/* {password === "" ? null : <FaRegCopy />} */}
            <h2>{password}</h2>
          </button>
        </div>
        {/* <hr /> */}
        <div className="formElement">
          <label htmlFor="passwordLength">Password Length</label>
          <input type="number" defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} id="passwordLength" className="passwordLength" name="passwordLength" />
        </div>
        <div className="formElement">
          <label htmlFor="uppercaseLetters">Uppercase Letters</label>
          <input type="checkbox" onChange={(e) => setIsUppercase(e.target.checked)} id="uppercaseLetters" name="uppercaseLetters" />
        </div>
        <div className="formElement">
          <label htmlFor="lowercaseLetters">Lowercase Letters</label>
          <input type="checkbox" onChange={(e) => setIsLowercase(e.target.checked)} id="lowercaseLetters" name="lowecaseLetters" />
        </div>
        <div className="formElement">
          <label htmlFor="numbers">Include Numbers</label>
          <input type="checkbox" onChange={(e) => setIsIncludeNumbers(e.target.checked)} id="numbers" name="numbers" />
        </div>
        <div className="formElement">
          <label htmlFor="symbols">Include Symbols</label>
          <input type="checkbox" onChange={(e) => setIsIncludeSymbols(e.target.checked)} id="symbols" name="symbols" />
        </div>
        <button className="generatorButton" onClick={handleGeneratePassword}>Generate Password</button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

export default App;

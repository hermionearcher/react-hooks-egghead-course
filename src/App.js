import './App.css';
import {
  Children,
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  useReducer,
} from 'react';

const Wizard = ({ children }) => {
  ////////////
};

const Page1 = () => <h1>Page 1</h1>;
const Page2 = () => <h1>Page 2</h1>;
const Page3 = () => <h1>Page 3</h1>;

function App() {
  return (
    <Wizard steps={3} className="wizard">
      <Wizard.Pages className="wizard__content">
        <Page1 />
        <Page2 />
        <Page3 />
      </Wizard.Pages>
      <div className="wizard__buttons">
        <Wizard.ButtonNext />
        <Wizard.ButtonPrev />
      </div>
    </Wizard>
  );
}

export default App;

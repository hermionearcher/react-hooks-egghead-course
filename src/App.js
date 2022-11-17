import './App.css';
import {
  Children,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';

const WizardContext = createContext();

//  Used to validate the context, swap out useWizardContext() for useContext(WizardContext) to remove
const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('Wizard component could not be rendered');
  }
  return context;
};

const ButtonPrev = () => {
  const { activePage, onPrevClick } = useWizardContext();
  return activePage > 0 ? (
    <button
      type="buttons"
      className="wizard__buttons-left"
      onClick={onPrevClick}
    >
      Previous
    </button>
  ) : null;
};

const ButtonNext = () => {
  const { activePage, onNextClick, steps } = useWizardContext();
  return activePage < steps - 1 ? (
    <button
      type="buttons"
      className="wizard__buttons-right"
      onClick={onNextClick}
    >
      Next
    </button>
  ) : null;
};

const Pages = ({ children }) => {
  const { activePage, setSteps } = useWizardContext();
  const pages = Children.toArray(children);
  const steps = Children.count(children);

  useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);

  const currentPage = pages[activePage];

  return <>{currentPage}</>;
};

const defaultInitalState = {
  activePageIndex: 0,
  steps: 0,
};

const Wizard = ({ children }) => {
  const [activePage, setActivePage] = useState(0);
  const [steps, setSteps] = useState(0);

  const onPrevClick = () => {
    setActivePage((index) => index - 1);
  };
  const onNextClick = () => {
    setActivePage((index) => index + 1);
  };

  const context = {
    activePage,
    onNextClick,
    onPrevClick,
    steps,
    setSteps,
  };

  return (
    <WizardContext.Provider value={context}>
      <>{children}</>
    </WizardContext.Provider>
  );
};

Wizard.Pages = Pages;
Wizard.ButtonNext = ButtonNext;
Wizard.ButtonPrev = ButtonPrev;

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

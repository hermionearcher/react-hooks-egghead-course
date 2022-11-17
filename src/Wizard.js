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

const defaultInitalState = {
  activePage: 0,
  steps: 0,
};

const actions = {
  NEXT_PAGE: 'NEXT_PAGE',
  PREV_PAGE: 'PREV_PAGE',
  SET_STEPS: 'SET_STEPS',
};

const defaultReducer = (state, action) => {
  const { activePage } = state;
  switch (action.type) {
    case actions.NEXT_PAGE:
      return { ...state, activePage: activePage + 1 };
    case actions.PREV_PAGE:
      return { ...state, activePage: activePage - 1 };
    case actions.SET_STEPS:
      return { ...state, steps: actions.payload };
    default:
      return state;
  }
};

const Wizard = ({ children }) => {
  const [{ activePage, steps }, dispatch] = useReducer(
    defaultReducer,
    defaultInitalState
  );

  const onPrevClick = useCallback(() => {
    dispatch({ type: actions.PREV_PAGE });
  });

  const onNextClick = useCallback(() => {
    dispatch({ type: actions.NEXT_PAGE });
  });

  const setSteps = useCallback(
    (n) => {
      dispatch({ type: actions.SET_STEPS, payload: n });
    },
    [dispatch]
  );

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

}

const Pages = ({ children }) => {
  const { activePage, setSteps } = useWizardContext();
  const pages = Children.toArray(children);
  const steps = Children.count(children);
  const currentPage = pages[activePage];

  useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);

  return <>{currentPage}</>;
};

Wizard.Pages = Pages;
Wizard.ButtonNext = ButtonNext;
Wizard.ButtonPrev = ButtonPrev;

export default Wizard;
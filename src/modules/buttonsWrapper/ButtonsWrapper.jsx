import ActionInfoButton from "../actionInfoButton/ActionInfoButton";
//import FilterByDate from "../filterByDate/FilterByDate";
import FilterByPeriod from "../filterByPeriod/FilterByPeriod";
import FilterMenu from "../filterMenu/FilterMenu";
import FormModalButton from "../formModalButton/FormModalButton";
import classes from "./buttonsWrapper.module.css";

const ButtonsWrapper = () => {
  return (
    <div className={classes.container}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <FilterMenu />
        {/*<FilterByDate />*/}
        <FilterByPeriod />
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <FormModalButton />
        <ActionInfoButton />
      </div>
    </div>
  );
};

export default ButtonsWrapper;

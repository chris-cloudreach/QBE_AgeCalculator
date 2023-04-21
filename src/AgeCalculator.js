import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./AgeCalculator.css";
import {
  Typography,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
import { intervalToDuration } from "date-fns";
// const { differenceInCalendarYears, differenceInYears, intervalToDuration, parse } = require("date-fns")


export default function AgeCalculator() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [error, setError] = React.useState({ state: false, msg: "" });

  const calculateAge = () => {
    const today = new Date();
    if (!selectedDate) {
      setError({ state: true, msg: "Please select a valid date" });
      setAge(null);
      return;
    }
    const birthDate = new Date(selectedDate);
    if (birthDate > today) {
      setError({ state: true, msg: "Birth date cannot be greater than today" });
      setAge(null);
      return;
    }

    const { years, months, days } = intervalToDuration({ start: birthDate, end: today});
    setAge({ years, months, days });
  };

  return (
    <div className="contain">
      <Typography variant="h2" color={"primary"}>
        Age Calculator
      </Typography>
      <Box
        sx={{
          display: "flex",
          margin: "50px 0",
        }}
      >
        <Box>
          <Box sx={{ display: "block" }} data-testid="date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="p" sx={{ fontSize: "20px" }}>
                Choose your birth date
              </Typography>
              <br />
              <br />
              <DatePicker
                sx={{
                  width: "400px",
                  border: `1px solid ${error.state ? "red" : "transparent"}`,
                  borderRadius: "5px",
                }}
                onChange={(e) => {
                  setError({ state: false, msg: "" });
                  setSelectedDate(e.$d);
                }}
              />
              {error.state && (
                <Typography color={"red"} fontSize={"14px"}>
                  {error.msg}
                </Typography>
              )}
            </LocalizationProvider>
          </Box>
          <Button
            variant="contained"
            size="large"
            sx={{ margin: "30px 0", padding: "20px" }}
            color="primary"
            onClick={calculateAge}
          >
            Calculate Age
          </Button>
          {age && (
            <Grid item xs={12} data-testid="age-grid">
              <Typography fontSize={"20px"} data-testid="age-text">
                You are {age.years} years, {age.months} months, and {age.days}{" "}
                days old.
              </Typography>
            </Grid>
          )}
        </Box>
      </Box>
    </div>
  );
}
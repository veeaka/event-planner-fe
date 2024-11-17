import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Grid, CircularProgress } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  StyledAsterisk,
  StyledButton,
  StyledFormGroup,
  StyledLabel,
  StyledOutlinedButton,
  StyledSpaceBetween,
  Textarea,
  TextInput,
} from "../utils/CustomComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  editEvent,
  setEventModalOpen,
  setEvents,
} from "../../store/slices/eventSlice";
import { AppDispatch, RootState } from "../../store";
import { format, parse } from "date-fns";

interface EventFormInputs {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

interface EventFormProps {
  id?: string | null;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  location: yup.string().required("Location is required"),
});

const EventForm: React.FC<EventFormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormInputs>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.event
  );

  // Fetch event details if editing
  useEffect(() => {
    if (event) {
      const parsedDate = parse(event.date, "dd MMM yy", new Date());
      const formattedDate = format(parsedDate, "yyyy-MM-dd");

      // Parse time directly
      const parsedTime = parse(event.time, "hh:mm a", new Date());
      const formattedTime = format(parsedTime, "HH:mm");

      reset({
        title: event.title,
        description: event.description,
        date: formattedDate,
        time: formattedTime,
        location: event.location,
      });
    }
  }, [id, event, reset]);

  const handleSubmitForm: SubmitHandler<EventFormInputs> = async (data) => {
    dispatch(setEvents([]));
    if (event?.id) {
      dispatch(editEvent({ id: event?.id, updatedData: data }));
      return;
    }
    dispatch(createEvent(data));
  };

  const handleClose = () => {
    dispatch(setEventModalOpen(false));
  };

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="form">
        {/* Title Field */}
        <StyledFormGroup>
          <StyledSpaceBetween>
            <StyledLabel htmlFor="title">
              Title <StyledAsterisk>*</StyledAsterisk>
            </StyledLabel>
          </StyledSpaceBetween>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                type="text"
                fullWidth
                {...field}
                placeholder="Enter event title"
                size="small"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </StyledFormGroup>

        {/* Description Field */}
        <StyledFormGroup>
          <StyledSpaceBetween>
            <StyledLabel htmlFor="description">
              Description <StyledAsterisk>*</StyledAsterisk>
            </StyledLabel>
          </StyledSpaceBetween>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea
                type="text"
                fullWidth
                {...field}
                minRows={3}
                placeholder="Enter event description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </StyledFormGroup>

        <Grid display="flex" gap="10px">
          <Grid width="50%">
            {/* Date Field */}
            <StyledFormGroup>
              <StyledSpaceBetween>
                <StyledLabel htmlFor="date">
                  Date <StyledAsterisk>*</StyledAsterisk>
                </StyledLabel>
              </StyledSpaceBetween>
              <Controller
                name="date"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextInput
                    type="date"
                    fullWidth
                    {...field}
                    placeholder="Select date"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    error={!!errors.date}
                    helperText={errors.date?.message}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0], // Disable past dates
                    }}
                  />
                )}
              />
            </StyledFormGroup>
          </Grid>
          <Grid width="50%">
            {/* Time Field */}
            <StyledFormGroup>
              <StyledSpaceBetween>
                <StyledLabel htmlFor="time">
                  Time <StyledAsterisk>*</StyledAsterisk>
                </StyledLabel>
              </StyledSpaceBetween>
              <Controller
                name="time"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextInput
                    type="time"
                    fullWidth
                    {...field}
                    placeholder="Select time"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    error={!!errors.time}
                    helperText={errors.time?.message}
                  />
                )}
              />
            </StyledFormGroup>
          </Grid>
        </Grid>

        {/* Location Field */}
        <StyledFormGroup>
          <StyledSpaceBetween>
            <StyledLabel htmlFor="location">
              Location <StyledAsterisk>*</StyledAsterisk>
            </StyledLabel>
          </StyledSpaceBetween>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                type="text"
                fullWidth
                {...field}
                placeholder="Enter event location"
                size="small"
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            )}
          />
        </StyledFormGroup>

        {/* Submit Button */}
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
          gap={2}
        >
          <StyledOutlinedButton onClick={handleClose}>
            {"Cancel"}
          </StyledOutlinedButton>
          <StyledButton type="submit">
            {event?.id ? "Update" : "Submit"}
          </StyledButton>
        </Grid>
      </form>
    </div>
  );
};

export default EventForm;

import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}
interface EventCardProps {
  event: Event;
}

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "10px",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: "8px",
  },
}));

const EventCard: React.FC<EventCardProps> = ({
  event,
}: {
  event: EventCardProps;
}) => {
  console.log(event);
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">#{event?.id}</Typography>
          <Typography variant="body2" color="textSecondary">
            {event?.date} - {event?.time}
          </Typography>
        </Box>
        <Typography variant="h5" gutterBottom>
          {event?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {event?.description}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Location:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {event?.location}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default EventCard;

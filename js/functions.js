const isFitMeeting = function(start, end, meet, duration){
  const startHM = start.split(':');
  const endHM = end.split(':');
  const meetHM = meet.split(':');
  if (parseInt(startHM[0],10) < parseInt(meetHM[0],10) || parseInt(startHM[0],10) === parseInt(meetHM[0],10) && parseInt(startHM[1],10) < parseInt(meetHM[1],10)){
    return false;
  }
  else if ((parseInt(endHM[0],10)-parseInt(meetHM[0],10))*60 + parseInt(endHM[1],10)-parseInt(meetHM[1],10) < duration){
    return false;
  }
  return true;
};
isFitMeeting();

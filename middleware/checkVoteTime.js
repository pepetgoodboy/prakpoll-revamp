const checkVoteTime = (election) => {
  const now = new Date();
  const start = new Date(election.startDate);
  const end = new Date(election.endDate);

  if (now.getTime() < start.getTime()) {
    return {
      message: "Pemilihan belum dimulai",
      status: 400,
    };
  } else if (now.getTime() > end.getTime()) {
    return {
      message: "Pemilihan telah berakhir",
      status: 400,
    };
  }

  return;
};

export { checkVoteTime };

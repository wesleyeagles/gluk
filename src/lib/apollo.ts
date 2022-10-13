import { ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from 'apollo-link-error'

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
  })

export const ApolloServer = new ApolloClient({
    uri: 'https://api-sa-east-1.hygraph.com/v2/cl92wh3we3by201ul7rcp09qm/master',
    headers: {
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjU0MTYwMDIsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w5MndoM3dlM2J5MjAxdWw3cmNwMDlxbS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYjdhNWVhNzEtZGFiMy00Njk2LTg4ZDktYWU5ZjkxOTdhZmRhIiwianRpIjoiY2w5MnhvcnBnM2Y5eTAxdWs1cHZrYmU5OSJ9.ACM1Px6VdvPCNhVj3jMKcqnP3UQsL1uWlPQsSg7Htwn74Q941RgRduTQfdP8U_XCrA_gzzAOGPi8yM8z2IHEy1aZ7r_eusxtE7pFd7DnT4FDCme8IGxsacwPGhusCxCw6sDMm5zxo0NZ3aqtaZm8o7taNumiZ_ORYQ3xK8uyOcOGlR0dp1fJygj9B1WxIGEnC70xS3SaJoIyEEr1tRTi3-9oMxkyg1HrmpXCyUstuNvtF3mQOYMVSxGtCdjXfhg-uP8rxfIJiqNaXYH5fB3Y-6w29MczJTBAbvXduijUKrFGr4aDyeY7GRGwyxPBrWjCqEagk9KWGZTLMuSjudIYae5ggPSZx8D8NYP5sM6olqqjXoKcz4d6UScRda3Dho-n8FYXrqTcoj9ITLUFSbEkU5SJkIlssXFK3uTAmmtk5_borazDAUBoM9MJDqPZ6q380TNeE8XnOPM0AoeXrhXWxyYui0rr0pSQMsLKvggb6wxAn43ovJtcZICxo3CHLObDq8gZXohssM1E0ebeKDnUcSjLp9OnsxNk7J-g6BorO8SXfAa2uojpySJZcYzQBtYnG7lMELoAC30trLrqfq7l93dTOb5uEbkHfDhoxPlWRg4ok1_lJHMCLONPJjNL8HvoEcRluNfW48Cs_No9rn6kjWCvp7J8-rGu22Ta343AATo`
    },

    cache: new InMemoryCache()
})
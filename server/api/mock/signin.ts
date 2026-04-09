import { RefreshTokenResponse } from "~/types/common"

export default defineEventHandler(async (event): Promise<RefreshTokenResponse> => {
    return {
        userId: 1,
        authenticationToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlNmM1ZmVhMi1iODU4LTQ5ZWQtOWViOS0wMjc3YTNiNzQ5M2YtMTc0MTg0MDUwMTA3MCIsImV4cCI6MTc0MTg0MTQwMSwiaWF0IjoxNzQxODQwNTAxLCJ1dWlkIjoiMGQxYWYwNjMtZWQ1Yy00Mzg3LTkxYjItMDQyOTI3OTliMDZjIn0.XLnamWBWipqEmKEfD-BHsVZQQmgO0qx0SutCIeMvTzg5UsMtV0MDQpx5h2fVe1OKUfyAgfRl3FVDeUaQN5SFnQ',
        refreshToken: 'e6c5fea2-b858-49ed-9eb9-0277a3b7493f-1741840501070',
        expiresAt: '2025-03-13T04:50:01.087+00:00'
    }
})
import { render } from "@testing-library/react";
import { UseAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/appRouter";

jest.mock('../../src/hooks/useAuthStore');
describe('Pruebas en el AppRouter', () => {
    const mockCheckAuthToken = jest.fn();
    beforeEach(() => jest.clearAllMocks());
    test('Debe montar el componente por defecto ', () => {

        UseAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken,
        })

        render(<AppRouter />)
        expect(mockCheckAuthToken).toHaveBeenCalled();

    })


})
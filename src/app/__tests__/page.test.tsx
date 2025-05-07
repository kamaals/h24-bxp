import '@testing-library/jest-dom'
import  { render, screen } from '@testing-library/react'
import Page from  '../page'

describe("Home Page", () => {
    it("Should render the page with the title", () => {
        render(<Page />)
        const title = screen.getByRole("heading", {level: 1})
        expect(title).toBeInTheDocument()
    });

    it('Should renders correctly', () => {
        const { container } = render(<Page />)
        expect(container).toMatchSnapshot();
    });
})

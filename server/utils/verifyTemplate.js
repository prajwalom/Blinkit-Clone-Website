const verifyEmailTemplate = ({name, url}) => {
    return `
    <p>
    Dear ${name}
    </p>

    <p>
    Thank you for registering with BlinkIR. </p>

    <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
    Verify your email </a> `
}
export default verifyEmailTemplate;
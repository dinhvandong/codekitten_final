const root = "https://dev.teky.asia/v1";

//const root = "https://staging.teky.asia/v1";

const APICodeKitten = 
{
    mobile_otp_registration: root + "/auth/mobile_otp_registration",
    verify_mobile_otp_registration:
        root + "/auth/verify_mobile_otp_registration",
    registration_password: root + "/auth/registration_password",
    auth_token: root + "/auth/token/",
    auth_logout: root + "/auth/logout",
    change_password: root + "/auth/change_password",
    forgot_password: root + "/auth/forgot_password",
    forgot_password_by_phone: root + "/auth/forgot_by_phone",
    verify_forgot_by_phone: root + "/auth/verify_forgot_by_phone",
    reset_password: root + "/auth/reset_password",
    set_email: root + "/auth/set_email",
    verify_email: root + "/auth/verify_email",
};
export default APICodeKitten;

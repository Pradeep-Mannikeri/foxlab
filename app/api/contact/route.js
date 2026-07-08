import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        let firstName, lastName, email, phone, message;

        const contentType = req.headers.get("content-type");

        // ✅ Handle JSON (your main case)
        if (contentType && contentType.includes("application/json")) {
            const body = await req.json();
            ({ firstName, lastName, email, phone, message } = body);
        }

        // ✅ Handle form-data (fallback safety)
        else if (contentType && contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            firstName = formData.get("firstName");
            lastName = formData.get("lastName");
            email = formData.get("email");
            phone = formData.get("phone");
            message = formData.get("message");
        }

        // ❌ Unknown format
        else {
            return NextResponse.json(
                { success: false, error: "Unsupported format" },
                { status: 400 }
            );
        }

        // ✅ Validation
        if (!firstName || !email || !message) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // ✅ Mail setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"FOX LAB Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact Inquiry - ${firstName} ${lastName}`,
            html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:#5835f2;">New Contact Request</h2>

          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "-"}</p>

          <hr/>

          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("CONTACT ERROR:", error);

        return NextResponse.json(
            { success: false, error: "Mail failed" },
            { status: 500 }
        );
    }
}
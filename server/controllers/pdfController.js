const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const GeneratePdfInfo = require("../models/pdfGenerateModel");

exports.generatePDF = async (req, res) => {
  try {
    const { name, amount, date, pan, address, email, mobile } = req.body;

    const generatePDF = new GeneratePdfInfo({
      name,
      amount,
      date,
      pan,
      address,
      email,
      mobile,
    });

    await generatePDF.save();

    // Normalize the name to remove spaces and convert to lowercase
    const normalizedName = name.replace(/\s+/g, "").toLowerCase();

    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Open a new page in the browser
    const page = await browser.newPage();

    // Read the HTML view file
    const htmlContent = fs.readFileSync("./views/certificate.html", "utf-8");

    //top logo
    const toplogoData = fs.readFileSync("./assets/toploggo.png");
    const toplogoBase64 = toplogoData.toString("base64");
    const toplogoDataURL = `data:image/png;base64,${toplogoBase64}`;

    //logo image
    const logo = fs.readFileSync("./assets/logo_z.png");
    const logoBase64 = logo.toString("base64");
    const logoDataURL = `data:image/png;base64,${logoBase64}`;

    //divider image
    const dividerImage = fs.readFileSync("./assets/divider.png");
    const dividerBase64 = dividerImage.toString("base64");
    const dividerImageURl = `data:image/png;base64,${dividerBase64}`;

    //signature Image
    const signaturerImage = fs.readFileSync("./assets/rsz_sign.png");
    const signaturerBase64 = signaturerImage.toString("base64");
    const signaturerImageURl = `data:image/png;base64,${signaturerBase64}`;

    //Read the external CSS file
    const cssContent = fs.readFileSync("./views/css/style.css", "utf-8");
    // Set the HTML content of the page
    await page.setContent(
      `${htmlContent}<style>${cssContent}</style>`
        .replace("${name}", name)
        .replace(/\${amount}/g, amount)
        .replace("${date}", date)
        .replace("${email}", email)
        .replace("${mobile}", mobile)
        .replace("${pan}", pan)
        .replace("${address}", address)

        .replace(/(\.\.\/assets\/toplogo\.png)/g, toplogoDataURL)
        .replace(/(\.\.\/assets\/logo_z\.png)/g, logoDataURL)
        .replace(/(\.\.\/assets\/divider\.png)/g, dividerImageURl)
        .replace(/(\.\.\/assets\/rsz_sign\.png)/g, signaturerImageURl)
    );

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: "A4", landscape: true });

    // Save the PDF to a file named "output.pdf"
    // fs.writeFileSync(
    //   `./certificate/${normalizedName}-certificate.pdf`,
    //   pdfBuffer
    // );
    const filePath = path.join(
      __dirname,
      `../certificate/${normalizedName}-certificate.pdf`
    );
    fs.writeFileSync(filePath, pdfBuffer);

    console.log("PDF generated successfully");

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).json({ success: false, error: "Error sending PDF" });
      } else {
        console.log("PDF sent successfully");
      }
    });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Send an error response if something goes wrong
    res.status(500).json({ success: false, error: "Error generating PDF" });
  }
};

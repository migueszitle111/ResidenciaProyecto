//API codigo
// Importa la versión completa para desarrollo y las alternativas para producción
import puppeteerLib from "puppeteer";
import chromium from "@sparticuz/chromium"; // nueva alternativa para entornos serverless

const isDev = process.env.NODE_ENV !== "production";

export async function POST(req) {
  try {
    // Leer los datos del cuerpo de la solicitud
    const body = await req.json();
    const { conclusiones,  userData,SelectedImages } = body;
    console.log("imagenes", SelectedImages);

    // Serialización a querystring
    const conclusionesStr = encodeURIComponent(JSON.stringify(conclusiones ?? []));
    const userDataStr = encodeURIComponent(JSON.stringify(userData ?? {}));
    const imagenesStr = encodeURIComponent(JSON.stringify(SelectedImages ?? []));


    // Definir la URL SSR
    let baseUrl = "http://localhost:3000";
    if (!isDev && process.env.NEXT_PUBLIC_SITE_URL) {
      baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    }
    let targetUrl = `${baseUrl}/ReporteImprimir/UnionMuscular?` + 
      `conclusiones=${conclusionesStr}&userData=${userDataStr}&selectedImages=${imagenesStr}`;

    // Iniciar Puppeteer
    const puppeteer = isDev ? puppeteerLib : require("puppeteer-core");
    const executablePath = isDev ? undefined : await chromium.executablePath;

    const browser = await puppeteer.launch({
      args: isDev ? [] : chromium.args,
      defaultViewport: isDev ? undefined : chromium.defaultViewport,
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 30000 });
    await page.waitForTimeout(1000);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename='reporte.pdf'",
      },
    });
  } catch (error) {
    console.error("Error generando PDF SSR:", error);
    return new Response("Error generando PDF: " + error.message, { status: 500 });
  }
}

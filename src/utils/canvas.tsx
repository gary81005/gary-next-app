import { Sectors } from '@/types';

const img = typeof window !== 'undefined' ? new Image() : null;

if (img) {
  img.src =
    'https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.18169-9/15871651_1309913589064745_3044464811171783538_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=be3454&_nc_ohc=8thXr32zjrkAX-5Mbix&_nc_ht=scontent.ftpe8-1.fna&oh=00_AfBfPBRwy32WzY_89VyF4Z_2ypF6AA4_lUPhlmwcks5TdQ&oe=657A9B69';
}
export function setBg(sectors: Sectors[]) {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  let check = false;
  while (!check) {
    check = true;
    for (const el of sectors) {
      if (el.color === '#' + randomColor) {
        randomColor = Math.floor(Math.random() * 16777215).toString(16);
        check = false;
        break;
      }
    }
  }
  return '#' + randomColor;
}

export function drawSector(
  ctx: CanvasRenderingContext2D | null | undefined,
  sector: Sectors,
  i: number,
  len: number,
) {
  if (ctx) {
    const dia = ctx?.canvas.width || 0;
    const rad = dia / 2;
    const PI = Math.PI;
    const TAU = 2 * PI;
    const arc = TAU / len;
    const ang = arc * i; // Angle in radians
    const textX = rad - 10; // Adjust as needed

    ctx.save();

    // Rotate the canvas to the center of the sector
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);

    // Draw the colored sector
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, rad, -arc / 2, arc / 2);
    ctx.lineTo(0, 0);
    ctx.fill();

    const maxImageWidth = 80; // Set your desired max width
    const maxImageHeight = 80; // Set your desired max height
    // Create a circular clipping mask
    ctx.beginPath();
    // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.arc(textX - 40, 0, 40, 0, Math.PI * 2); // Adjust the radius as needed
    ctx.clip();

    // Draw the image
    if (img) {
      const imgX = textX - maxImageWidth; // Adjust as needed
      const scaleFactor = Math.min(maxImageWidth / img.width, maxImageHeight / img.height);
      const scaledWidth = img.width * scaleFactor;
      const scaledHeight = img.height * scaleFactor;
      ctx.drawImage(img, imgX, -scaledHeight / 2, scaledWidth, scaledHeight);
    }

    // Draw text
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(sector.label, textX, 10);

    // Reset transformations
    ctx.restore();
  } else {
    alert('Canvas not found');
  }
}

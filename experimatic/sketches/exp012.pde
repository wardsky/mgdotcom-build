PImage redImg, greenImg, blueImg;

PImage createChannel(float r, float g, float b) {
    PGraphics pg = createGraphics(200, 200);
    pg.beginDraw();
    pg.background(0x00);
    pg.stroke(r, g, b);
    pg.strokeWeight(20);
    pg.noFill();
    pg.ellipse(0.5 * pg.width, 0.5 * pg.height, pg.width - 22, pg.height - 22);
    pg.endDraw();
    return pg;
}

void drawChannel(PImage img, int x, int y) {
    int u = img.width;
    int v = img.height;
    blend(img, 0, 0, u, v, x - u / 2, y - v / 2, u, v, SUBTRACT); 
}

void setup() {
    size(400, 400);
    redImg = createChannel(0xff, 0x00, 0x00);
    greenImg = createChannel(0x00, 0xff, 0x00);
    blueImg = createChannel(0x00, 0x00, 0xff);
}

void draw() {
    int x0 = width / 2;
    int y0 = height / 2;
    int dmouseX = mouseX - pmouseX;
    int dmouseY = mouseY - pmouseY;
    background(0xff);
    drawChannel(redImg, x0 - dmouseX, y0 - dmouseY);
    drawChannel(greenImg, x0, y0);
    drawChannel(blueImg, x0 + dmouseX, y0 + dmouseY);
}

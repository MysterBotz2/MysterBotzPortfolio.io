export function setCamScale(k){
    const resizeFactor = k.width() / k.height();
    if(resizeFactor < 1)
    {
        k.camScale(k.vec2(0.5));
        return;
    }
    k.camScale(k.vec2(1));
}
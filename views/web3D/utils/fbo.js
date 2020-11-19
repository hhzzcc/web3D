export const initFramebufferObject = (gl, width, height) => {
  const size = width;

  const fbo = gl.createFramebuffer()
  const depthTexture = gl.createTexture()

  gl.bindTexture(gl.TEXTURE_2D, depthTexture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.DEPTH_COMPONENT,
    size,
    size,
    0,
    gl.DEPTH_COMPONENT,
    gl.UNSIGNED_SHORT,
    null
  )

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0
  )


  const e = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
  if (e !== gl.FRAMEBUFFER_COMPLETE) {
    console.error('framebuffer not complete', e.toString())
  }

  gl.bindTexture(gl.TEXTURE_2D, null)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  fbo.texture = depthTexture; 
  return fbo
}
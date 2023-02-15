const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles]
    const reqRolesArray = Object.values(req.roles)
    const result = rolesArray.some(role => reqRolesArray.includes(role))
    if (!result) return res.sendStatus(401);
    next();
  }
}

module.exports = verifyRoles

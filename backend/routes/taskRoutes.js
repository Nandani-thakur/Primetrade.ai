const router=require("express").Router()

const auth=require("../middleware/authMiddleware")
const role=require("../middleware/roleMiddleware")

const {
createTask,
getTasks,
updateTask,
deleteTask
}=require("../controllers/taskController")

router.post("/",auth,createTask)
router.get("/",auth,getTasks)
router.put("/:id",auth,updateTask)
router.delete("/:id",auth,role("admin"),deleteTask)

module.exports=router
using Microsoft.AspNetCore.Mvc;
using Model;
using Services;

namespace home_assignment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController(ITasksService tasksService) : ControllerBase
    {
        private readonly ITasksService _tasksService = tasksService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskEntity>>> Get()
        {
            var tasks = await _tasksService.GetTasksAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskEntity>> Get(int id)
        {
            var task = await _tasksService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<Task>> Post(TaskEntity task)
        {
            var createdTask = await _tasksService.CreateTaskAsync(task);
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TaskEntity task)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            var result = await _tasksService.UpdateTaskAsync(id, task);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _tasksService.DeleteTaskAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }


    }
}

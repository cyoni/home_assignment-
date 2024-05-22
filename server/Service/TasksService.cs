
using Model;
using Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface ITasksService
    {
        Task<IEnumerable<TaskEntity>> GetTasksAsync();
        Task<TaskEntity?> GetTaskByIdAsync(int id);
        Task<TaskEntity> CreateTaskAsync(TaskEntity task);
        Task<bool> UpdateTaskAsync(int id, TaskEntity task);
        Task<bool> DeleteTaskAsync(int id);
    }

    public class TasksService : ITasksService
    {
        private readonly ITaskRepository _taskRepository;

        public TasksService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<IEnumerable<TaskEntity>> GetTasksAsync()
        {
            return await _taskRepository.GetTasksAsync();
        }

        public async Task<TaskEntity?> GetTaskByIdAsync(int id)
        {
            return await _taskRepository.GetTaskByIdAsync(id);
        }

        public async Task<TaskEntity> CreateTaskAsync(TaskEntity task)
        {
            task.CreatedAt = DateTime.Now;
            return await _taskRepository.CreateTaskAsync(task);
        }

        public async Task<bool> UpdateTaskAsync(int id, TaskEntity task)
        {
            task.Id = id;
            return await _taskRepository.UpdateTaskAsync(task);
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            return await _taskRepository.DeleteTaskAsync(id);
        }
    }

}
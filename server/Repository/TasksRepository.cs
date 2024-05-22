
using Microsoft.EntityFrameworkCore;
using Model;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskEntity>> GetTasksAsync();
        Task<TaskEntity?> GetTaskByIdAsync(int id);
        Task<TaskEntity> CreateTaskAsync(TaskEntity task);
        Task<bool> UpdateTaskAsync(TaskEntity task);
        Task<bool> DeleteTaskAsync(int id);
        bool TaskExists(int id);
    }
    public class TasksRepository : ITaskRepository
    {
        private readonly TaskDbContext _context;

        public TasksRepository(TaskDbContext context)
        {
            _context = context;
        }

        //private TaskResponse JoinTaskAndUser( TaskEntity task, UserEntity user)
        //{
        //    return new TaskResponse
        //    {
        //        TaskId = task.Id,
        //        Title = task.Title,
        //        UserId = task.UserId,
        //        Name = user.Name,
        //        Priority = task.Priority,
        //        DueDate = task.DueDate,
        //        Created = task.CreatedAt
        //    };
        //}

        public async Task<IEnumerable<TaskEntity>> GetTasksAsync()
        {
           var tasks = await _context.Task.ToListAsync();
            //.Join(_context.User,
            //  task => task.UserId,
            //  user => user.Id,
            //  (task, user) => JoinTaskAndUser(task, user))


            return tasks;
        }

        public async Task<TaskEntity?> GetTaskByIdAsync(int id)
        {
            var task = await _context.Task.Where(x => x.Id == id).FirstOrDefaultAsync();
            return task;
            //.Join(_context.User,
            //  task => task.UserId,
            //  user => user.Id,
            //  (task, user) => JoinTaskAndUser(task, user)).Where(x => x.TaskId == id)
            ///  .FirstOrDefaultAsync();
        }

        public async Task<TaskEntity> CreateTaskAsync(TaskEntity task)
        {
            _context.Task.Add(task);
            await _context.SaveChangesAsync();
            return null;
        }

        public async Task<bool> UpdateTaskAsync(TaskEntity task)
        {
            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

            }
            return false;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _context.Task.FindAsync(id);
            if (task == null)
            {
                return false;
            }

           // var user = await _context.User.FindAsync(id);

            _context.Task.Remove(task);

           // if (user != null)  _context.User.Remove(user);

            await _context.SaveChangesAsync();
            return true;
        }

        public bool TaskExists(int id)
        {
            return _context.Task.Any(e => e.Id == id);
        }
    }

}
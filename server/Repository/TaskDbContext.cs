using Microsoft.EntityFrameworkCore;
using Model;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class TaskDbContext : DbContext
    {

        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {

        }

        public DbSet<TaskEntity> Task { get ; set; }
        public DbSet<UserEntity> User { get; set; }
    }
}

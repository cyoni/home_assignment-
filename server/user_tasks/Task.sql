CREATE TABLE [dbo].[Task]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Title] NVARCHAR(50) NOT NULL, 
    [Content] NVARCHAR(MAX) NULL, 
    [CreatedAt] DATE NULL, 
    [UpdatedAt] DATE NULL, 
    [DueDate] DATE NOT NULL, 
    [Priority] SMALLINT NULL, 
    [UserId] NVARCHAR(50) NULL
)

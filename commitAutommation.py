import subprocess

def verifyFile():
    aux = subprocess.run(['git', 'status', '-s'], stdout=subprocess.PIPE)
    return aux.stdout.decode('utf-8').splitlines()


def commit(status):
    commit_message = ""
    add = [file for file in status if file.startswith('??')]
    change = [file for file in status if file.startswith(' M')]
    delete = [file for file in status if file.startswith(' D')]
    
    if(add):
        commit_message += f"feat: add"
        for index, file in enumerate(add):
            commit_message += f"{file.split('??')[1]}"
            
            if(index < len(add) - 1):
                commit_message += ","
        commit_message += "\n"
        
    if(change):
        commit_message += f"chang: changing"
        for index, file in enumerate(change):
            if len(file.split(' M')[1].split("/")) == 1:
                commit_message += f"{file.split(' M')[1].split("/")[0]}"
            else: 
                lenght = len(file.split(' M')[1].split("/")) -1
                commit_message += f"{file.split(' M')[1].split("/")[lenght]}"
            
            if(index < len(change) - 1):
                commit_message += ", "
        commit_message += "\n"
            
    if(delete):
        commit_message += f"delet: delete"
        for index, file in enumerate(delete):
            if len(file.split(' D')[1].split("/")) == 1:
                commit_message += f"{file.split(' D')[1].split("/")[0]}"
            else: 
                lenght = len(file.split(' D')[1].split("/")) -1
                commit_message += f"{file.split(' D')[1].split("/")[lenght]}"
            
            if(index < len(delete) - 1):
                commit_message += ", "
        commit_message += "\n"
        
    if(commit_message == ""):
        print("No changes detected")
    else:
        subprocess.run(['git', 'add', '.'])
        subprocess.run(['git', 'commit', '-m', commit_message])
        subprocess.run(['git', 'push'])
        
    return commit_message
    
    
    

if(__name__ == "__main__"):
    a = verifyFile()
    if(a):
        commit(a)
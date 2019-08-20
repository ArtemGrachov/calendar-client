<template>
    <form>
        <div>
            <label for="title">Title:</label>
            <input type="text" name="title" id="title">
        </div>
        <div>
            <label for="start">Starts at:</label>
            <input type="datetime-local" name="start" id="start">
        </div>
        <div>
            <label for="end">Ends at:</label>
            <input type="datetime-local" name="end" id="end">
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea name="description" id="description" rows="10"></textarea>
        </div>
        <div>
            <label for="icon">Icon:</label>
            <select name="icon" id="icon">
                <option value="person">person</option>
                <option value="people">people</option>
                <option value="question">question</option>
                <option value="warning">warning</option>
                <option value="cat">cat</option>
                <option value="dog">dog</option>
                <option value="car">car</option>
                <option value="plane">plane</option>
                <option value="train">train</option>
            </select>
        </div>
        <div>
            <label for="color">Color:</label>
            <input type="color" name="color" id="color">
        </div>
        <button type="submit">Submit</button>
    </form>
</template>
